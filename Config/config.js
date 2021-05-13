const env = process.env.NODE_ENV || 'dev';
const config = () =>{
    switch (env){
        case 'dev':
            return {
                jwt_pass:'F1a2c5h4',
                jwt_expires_in:'1d'

            }

        case 'hml':
            return {

                jwt_pass:'F1a2c5h4',
                jwt_expires_in:'7d'
            }

        case 'prod':
            return {

                jwt_pass:'F1a2c5h4',
                jwt_expires_in:'7d'

            }
    }
}

console.log(`Iniciando API em ambiente ${env}`);

module.exports = config();