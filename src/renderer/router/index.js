import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      components: {
        subMenu: require('@/components/LandingPage').default,
        contentsView: require('@/components/MainMenu').default
      },
      children: [
        {
          path: 'key-practice',
          name: 'key-practice',
          component: require('@/components/KeyPractice').default
        },
        {
          path: 'word-practice',
          name: 'word-practice',
          component: require('@/components/WordPractice').default
        },
        {
          path: 'typing-setting',
          name: 'typing-setting',
          component: require('@/components/TypingSetting').default
        }
      ]
    },
    {
      path: '/key-practice/start',
      name: 'key-practice-start',
      components: {
        contentsView: require('@/components/KeyPractice/PracticeStart').default
      },
      props: {
        contentsView: route => ({ level: route.query.lvl, title: route.query.title })
      }
    },
    {
      path: '/key-practice/end',
      name: 'key-practice-end',
      components: {
        contentsView: require('@/components/KeyPractice/PracticeEnd').default
      },
      props: {
        contentsView: route => ({ level: route.query.lvl, title: route.query.title, accuracy: route.query.acr })
      }
    },
    {
      path: '/word-practice/start',
      name: 'word-practice-start',
      components: {
        contentsView: require('@/components/WordPractice/PracticeStart').default
      },
      props: {
        contentsView: route => ({ level: route.query.lvl, title: route.query.title })
      }
    },
    {
      path: '/word-practice/end',
      name: 'word-practice-end',
      components: {
        contentsView: require('@/components/WordPractice/PracticeEnd').default
      },
      props: {
        contentsView: route => ({ level: route.query.lvl, title: route.query.title, accuracy: route.query.acr })
      }
    },
    {
      path: '/typing-setting/1',
      name: 'typing-setting-1',
      components: {
        contentsView: require('@/components/TypingSetting/SettingNormal').default
      }
    },
    {
      path: '/typing-setting/2',
      name: 'typing-setting-2',
      components: {
        contentsView: require('@/components/TypingSetting/ProgramInfo').default
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
