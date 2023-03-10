#!/usr/bin/env node
import { AptosClient, AptosAccount, FaucetClient,HexString} from "aptos";
import * as fs from "fs"
import {create_candy} from "./instructions/create_candy"
import {update_root} from "./instructions/update_root"
import {makeid} from "./utils/seedGenerate"
import {program} from "commander"

program
  .version('0.0.1')
  .description("Candy machine smart contract for Aptos Blockchain.")
  .option('-c, --create_candy', 'create_candy')
  .option('-u, --update_root', 'update_root')
  .option('-w, --config', 'config')
  .option('-p, --pause_mint', 'pause_mint')
  .parse(process.argv);

let argIndex = process.argv.indexOf('--config')

const fileStream = JSON.parse(fs.readFileSync(process.argv[argIndex+1],"utf8"));
const options = program.opts();
const client = new AptosClient(fileStream['NODE_URL']);

if (options.create_candy) {
  const alice = new AptosAccount(HexString.ensure(fileStream['creator_private_key']).toUint8Array(),undefined);
  create_candy(alice,fileStream,client,makeid,AptosClient);  
}
if (options.update_root) {
  const alice = new AptosAccount(HexString.ensure(fileStream['creator_private_key']).toUint8Array(),undefined);
  const client = new AptosClient(fileStream['NODE_URL']);
  update_root(alice,fileStream,client,makeid,AptosClient);  
}
if (!process.argv.slice(1).length) {
  program.outputHelp();
}

