import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import postCssPxToRem from 'postcss-pxtorem';
// https://vite.dev/config/

export default ({mode}) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver()],
      }),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      port: 80,
      proxy: {
        [env.VITE_BASE_URL]: {
          target: 'http://192.168.1.130:2012/',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp([env.VITE_BASE_URL], 'gi'), "")
        },
      },
      host: '0.0.0.0'
    },
    css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 37.5, // 1rem，根据设计稿宽度 / 10进行设置
            propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
            exclude: /node_modules/i // 忽略包文件转换rem
          })
        ]
      }
    }
  })
}
