const path = require('path')
const utils = require('./examples/utils/index')
const MarkdownItContainer = require('markdown-it-container')
let HyperDown = require('hyperdown')
let parser = new HyperDown()
const vueMarkdown = {
    preprocess: (MarkdownIt, source) => {
        MarkdownIt.renderer.rules.table_open = function () {
            return '<table class="table">'
        }
        MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)
        return parser.makeHtml(source)
    },
    use: [
        [MarkdownItContainer, 'demo', {
            validate: params => params.trim().match(/^demo\s*(.*)$/),
            render: function (tokens, idx) {
                // eslint-disable-next-line no-unused-vars
                let m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
                if (tokens[idx].nesting === 1) {
                    // eslint-disable-next-line no-unused-vars
                    let desc = tokens[idx + 2].content
                    const html = utils.convertHtml(utils.striptags(tokens[idx + 1].content, 'script'))
                    // 移除描述，防止被添加到代码块
                    tokens[idx + 2].children = []

                    return `<demo-block>
                          <div slot="desc">${html}</div>
                          <div slot="highlight">`
                }
                return '</div></demo-block>\n'
            }
        }]
    ]
}

module.exports = {
    configureWebpack: (config) => {
        config.entry.app = ['babel-polyfill', './examples/main.js']
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', path.resolve('examples'))
            .set('~', path.resolve('packages'))
        config.module
            .rule('eslint')
            .exclude.add(path.resolve('lib'))
            .end()
            .exclude.add(path.resolve('examples/docs'))
            .end()
        config.module
            .rule('js')
            .include.add(/packages/)
            .end()
            .include.add(/examples/)
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options
            })
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options(vueMarkdown)
            .end()
    }
}
