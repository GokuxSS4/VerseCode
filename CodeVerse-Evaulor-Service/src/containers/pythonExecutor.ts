import { PYTHON_IMAGE } from "../utils/constant";
import createDockerContainer from "./containerFactory";
import decodeBuffer from "./dockerHelper";

import CodeExecutorStrategy, { ExecutionResponse } from './../types/codeExecutorStatagy';
import pullImage from "./pullImages";

export default class PythonExecutor implements CodeExecutorStrategy{
    async execute(code: string, inputTestCase: string,outputTestCase:string) : Promise<ExecutionResponse>{
        const rowLogBuffer: Buffer[] = [];

        await pullImage(PYTHON_IMAGE);

        const runCommand = `echo '${code}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
        const pythonContainer = await createDockerContainer(PYTHON_IMAGE, [
            '/bin/sh', 
            '-c',
            runCommand
        ]);
       
        await pythonContainer.start();
    
        console.log("Booting the container");
     
    
        const loggerStream = await pythonContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true // whether the logs are streamed or returned as a string
        });
    
        loggerStream.on('data',(chunk: Buffer)=>{
            rowLogBuffer.push(chunk);
        })
    
        try {
            const codeResponse : string = await this.fetchDecodeStream(loggerStream, rowLogBuffer);
            if(codeResponse.trim() === outputTestCase.trim()) {
                return {output: codeResponse, status: "SUCCESS"};
            } else {
                return {output: codeResponse, status: "WA"};
            }

        } catch (error) {
            if(error === "TLE") {
                await pythonContainer.kill();
            }
            return {output: error as string, status: "ERROR"}
        } finally {
            await pythonContainer.remove();
        }


    }

    fetchDecodeStream(loggerStream:NodeJS.ReadableStream,rowLogBuffer: Buffer[]):Promise<string> {
        loggerStream.on('data',(chunk: Buffer)=>{
            rowLogBuffer.push(chunk);
        })
    
    
        return new Promise((resolve,reject)=>{
            const timeout = setTimeout(() => {
                console.log("Timeout called");
                reject("TLE");
            }, 2000);


            loggerStream.on('end',()=>{
                clearTimeout(timeout);
                const completeBuffer = Buffer.concat(rowLogBuffer);
                const decodedLog = decodeBuffer(completeBuffer);
                if(decodedLog.stderr){
                    reject(decodedLog.stderr);
                }
                if(decodedLog.stdout){
                    const outStr= decodedLog.stdout;
                    resolve(outStr.split('\n')[0]);
                }
            });
        })
    
    }
}

