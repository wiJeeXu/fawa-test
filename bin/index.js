#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const dedent = require('dedent')
const pkg = require('../package.json')
const arg = hideBin(process.argv)
const cli = yargs(arg)
const argv = process.argv.slice(2)
const context = {
    fawaVersion: pkg.version
}

  cli
 .usage('Usage fawa-test [command] <options>')
 .demandCommand(1, '最少需要输入一个command')
 .strict()
 .recommendCommands()
 .fail((err, msg) => {
    console.log(err)
 })
 .alias('h', 'help')
 .alias('v', 'version')
 .wrap(cli.terminalWidth())
 .epilogue(dedent` 页脚
 顶格显示`)
 .options({
    debug: {
        type: "boolean",
        describe: '启动debug模式',
        alias: 'd'
    }
 })
 .option('registry', {
    type: 'string',
    describe: '定义全局仓库地址',
    alias: 'r'
 })
 .group(['debug'], 'Dev Options:')
 .group(['registry'], 'Extra Options:')
 .command('init [name]', '初始化项目', (yargs) => {
    yargs.option('name', {
        type: 'string',
        describe: '项目的名称',
        alias: 'n'
    })
 }, (argv) => {
    console.log(argv)
 })
 .command({
    command: 'list',
    aliases: ['ls', 'la', 'll'],
    describe: '本地packages打印',
    builder: (yargs) => {},
    handler: (argv) => {
        console.log(argv)
    }
 })
 .parse(argv, context)