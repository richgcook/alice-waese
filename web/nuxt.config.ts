export default defineNuxtConfig({

	app: {
		head: {
			title: process.env.SITE_TITLE,
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
				{ hid: 'robots', name: 'robots', content: 'index, follow' }
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: 'favicon.png' },
			],
		},
	},

	runtimeConfig: {
		public: {
			siteTitle: process.env.SITE_TITLE
		}
	},

	css: [
		'~/assets/css/reset.css',
		'~/assets/css/global.scss'
	],

	vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/assets/scss/_mixins.scss" as *;`
                }
            }
        }
    },

	experimental: { inlineSSRStyles: false },

	modules: [
		'@nuxtjs/sanity', 
		'@pinia/nuxt',
		'@nuxt/image',
		'lenis/nuxt',
	],

	build: {
		transpile: ['gsap', 'pinia']
	},

	devtools: { enabled: false },
	
	sanity: {
		'projectId': process.env.SANITY_PROJECT_ID,
    	'dataset': process.env.SANITY_PROJECT_DATASET,
		'apiVersion': process.env.SANITY_API_VERSION,
		'useCdn': false
	},

	image: {
		screens: {
			phone: 0,
			'tablet-portrait': 768,
			'tablet-landscape': 1024,
			'laptop': 1200,
			'desktop': 1440,
			'desktop-large': 1600,
		},
		quality: 100,
		provider: 'sanity',
		sanity: {
			projectId: process.env.SANITY_PROJECT_ID,
		}
	},

	compatibilityDate: '2025-08-01',

	sitemap: {
		// Not needed currently as no pages are `prerender: false`
		// sources: [
		// 	'/api/sitemap/urls',
		// ],
		xsl: false,
	},

})
