import vituum from 'vituum'
import twig from '@vituum/vite-plugin-twig'

export default {
	plugins: [
		vituum({
			imports: {
				filenamePattern: {
					'+.css': [],
					'+.scss': 'src/styles'
				}
			}
		}),
		twig({
			root: './src',
			globals: {
				company: "unleash2capture",
				companyEmail: "mvajskebr@unleash2capture.com",
				companyPhone: "+420 602 675 924",
				companyRepresentative: "Michal Vajskebr"
			}
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
         @import "./src/styles-vars/_variables.scss";
         @import "./src/styles-vars/_mixins.scss";
       `
			}
		}
	}
}
