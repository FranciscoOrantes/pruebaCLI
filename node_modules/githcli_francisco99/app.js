#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const inquirer = require('inquirer');
const shell = require('shelljs');
var confirm = require('inquirer-confirm');


clear();
console.log('');
console.log('');
/*console.log(
chalk.yellow(

    figlet.textSync('GIT-CLI', { font : 'standard', horizontalLayout: "full"})
)
);*/

inquirer.prompt([
    {
        name: 'list',
        type: 'list',
        message: 'Que quieres hacer?',
        choices:[
            {
                name:'Crear un repositorio',
                type:'checkbox',
                message: 'crea',
                value:'1'
            },
            {
                name:'Clonar un repositorio',
                type:'checkbox',
                message: 'clona',
                value:'2'
            },
            {
                name:'Crear ramas',
                type:'checkbox',
                message: 'crear',
                value:'3'
            },
            {
                name:'Eliminar ramas',
                type:'checkbox',
                message: 'eliminar',
                value:'4'
            },
            {
                name:'ver remotos y agregar',
                type:'checkbox',
                message: 'remotosAdd',
                value:'5'
            },
            {
                name:'ver remotos y eliminar',
                type:'checkbox',
                message: 'remotos',
                value:'6'
            },

            {
                name:'salir',
                type:'checkbox',
                message: 'salir',
                value:'7'
            },
    
        ]
    }
    ]).then(answers =>{
        if(answers.list==1){
            crearRepo()
       
                }if(answers.list==2){
                   clonarRepo()
                }if(answers.list==3){
                    ramas()
                }
                if(answers.list==4){
                    eliminarRamas()
                }
                if(answers.list==5){
                    agregarRemotos()
                }
                if(answers.list==6){
                    verYEliminarRemotos()
                }
                if(answers.list==7){
                    salir()
                }
    });
     
    function crearRepo(){
        inquirer.prompt({
            name:'Create',
            type: 'input',
            message:'Ingresa la ruta de donde quieres inicializar tu repo '
    
        }).then(answer => {
            console.log(answer)
            shell.exec('sudo ' + 'git init '+ ' ' + answer.Create)
            
            console.log('');
        inquirer.prompt({
            name:'Create',
            type: 'input',
            message:'Ingresa el nombre del commit entre comillas'
    
        }).then(answer => {
            
            shell.exec('sudo ' + 'git add . ');
            console.log("se hizo el add")
            shell.exec('sudo ' + 'git commit -m ' + ' ' + answer.Create)
            console.log('');
        }).then(answer => {
            inquirer.prompt({
                name:'Create',
                type: 'input',
                message:'Ingresa tu email de github entre comillas'
                
            }).then(answer => {
                shell.exec('sudo git config --global user.email ' + answer.Create)
                inquirer.prompt({
                    name:'Create',
                    type:'input',
                    message:'Ingresa tu name de github entre comillas '
                }).then(answer => {
                    shell.exec('sudo git config --global user.name ' + answer.Create)
                    inquirer.prompt({
                        name:'Create',
                        type: 'input',
                        message:'Ingresa la url de tu repositorio en github '
                
                    }).then(answer => {
                        console.log(answer)
                        shell.exec('sudo git remote add origin ' + ' ' + answer.Create)
                        shell.exec('sudo git push -u origin master ');
            
                      
                    });
                })
            })
        })
            
        });

       
        
        
    }
    function clonarRepo(){
       var ruta = " "
        inquirer.prompt({
            name:'Clonar',
            type:'input',
            message:'Ingresa el directorio en donde quieres clonar tu repositorio de github'
        }).then(answer => {
            ruta = answer.Clonar
            console.log(ruta)
            inquirer.prompt({
               name:'urlClonar',
               type:'input',
               message:'Ingresa la url del repositorio en github'
           }).then(answer => {
               shell.exec('sudo ' + ' ' + 'git clone ' + answer.urlClonar + ' ' + ruta )
           }) 
        })
    }
    function ramas(){
        confirm('Tu repositorio esta clonado?')
        .then(function confirmed() {
         
          inquirer.prompt({
          name:'DirectorioRepo',
          type:'input',
          message:'Ingresa la ruta de donde esta clonado tu repositorio'

          }).then(answer => {
            shell.exec('cd ' + answer.DirectorioRepo)
            inquirer.prompt({
                name:'creaRama',
                type:'input',
                message:'Ingresa el nombre de la rama'
            }).then(answer => {
                shell.exec('sudo git branch ' + answer.creaRama)
                console.log('Tu rama ha sido creada')
                shell.exec('sudo git checkout master ')
                shell.exec('sudo git branch -v ')
            })
          })
          
        }, function cancelled() {
          clonarRepo();
          ramas();
        });
    }
    function eliminarRamas(){
        inquirer.prompt({
          name:'DirectorioRepo',
          type:'input',
          message:'Ingresa la ruta de donde esta clonado tu repositorio'
        }).then(answer => {
           shell.exec('cd ' + answer.DirectorioRepo)
           shell.exec('sudo git checkout master ')
           shell.exec('sudo git branch -v ')
           inquirer.prompt({
            name:'eliminaRama',
            type:'input',
            message:'Ingresa el nombre de la rama'
        }).then(answer => {
            shell.exec('sudo git branch -d ' + answer.eliminaRama)
            console.log('Tu rama ha sido eliminada')
        })
        })
    }
    function agregarRemotos(){
        var servidor = " "
        inquirer.prompt({
            name:'DirectorioRepo',
            type:'input',
            message:'Ingresa la ruta de donde esta clonado tu repositorio'
          }).then(answer => {
            shell.exec('cd ' + answer.DirectorioRepo)
            shell.exec('sudo git remote -v ')
            inquirer.prompt({
            name:'Servidor',
            type:'input',
            message:'Ingresa la url de tu repositorio de github'
            }).then(answer => {
                servidor = answer.Servidor
                console.log(servidor)
                inquirer.prompt({
                    name:'agregaRemote',
                    type:'input',
                    message:'Ingresa el nombre del remote'
                }).then(answer => {
                    //console.log('sudo git remote add ' + answer.agregaRemote + ' ' + servidor)
                    shell.exec('sudo git remote add ' + answer.agregaRemote + ' ' + servidor)
                    console.log('Tu remote ha sido agregado')
                    shell.exec('sudo git remote -v ')
                })
            })
            
          })
    }
    function verYEliminarRemotos(){
        inquirer.prompt({
            name:'DirectorioRepo',
            type:'input',
            message:'Ingresa la ruta de donde esta clonado tu repositorio'
          }).then(answer => {
            shell.exec('cd ' + answer.DirectorioRepo)
            shell.exec('sudo git remote -v ')
            inquirer.prompt({
                name:'eliminaRemote',
                type:'input',
                message:'Ingresa el nombre del remote'
            }).then(answer => {
                shell.exec('sudo git remote remove ' + answer.eliminaRemote)
                console.log('Tu remote ha sido eliminado')
                shell.exec('sudo git remote -v ')
            })
          })
    }
    function salir(){
        shell.exec('exit ')
    }
    
    