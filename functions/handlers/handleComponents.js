const { readdirSync } = require('fs')
const path = require('path');
module.exports = (client) => {
    client.handleComponents = async () => {
        const componentsPath = path.resolve(__dirname, '../../components')
        const componentFolders = readdirSync(componentsPath)
        for (const folder of componentFolders) {
            const folderPath = path.join(componentsPath, folder)
            const componentFiles = readdirSync(folderPath).filter(file => file.endsWith('.js'))

            const { buttons, selectMenus, modals } = client

            switch (folder) {
                case 'buttons':
                    for (const file of componentFiles) {
                        const filePath = path.join(folderPath, file)
                        const button = require(filePath)
                        buttons.set(button.data.name, button)
                    }
                    break;

                case 'selectMenus':
                    for (const file of componentFiles) {
                        const filePath = path.join(folderPath, file)
                        const menu = require(filePath)
                        selectMenus.set(menu.data.name, menu)
                    }
                    break;

                case 'modals':
                    for (const file of componentFiles) {
                        const filePath = path.join(folderPath, file)
                        const modal = require(filePath)
                        modals.set(modal.data.name, modal)
                    }

                default:
                    break;
            }
        }
    }
}