const express = require("express");
const path = require("path");
const DB=require('../database/models')

const alertaController = {

    alerta: async (req, res) => {
        try {
            const result = await DB.alertas.findAll( {include: ["usuario"]},);
            res.send(result)
        } catch (e) {
            res.send(e)
        }
    },
   
    guardaralerta: async (req, res) => {
        const data=req.body;
        console.log(data);
        try {
           const  result = await DB.alertas.create(data)
            res.send({msg:'la alerta se creo con exito!!',status:200,alertaCreada:result})
        } catch (e) {
            res.send(e)
        }
    },
    editaralerta: async (req, res) => {
        const { id } = req.params;
        try {
            const result= await DB.alertas.update({estado:'inactiva'},{where:{id}})
             res.send({msg:'la alerta se edito con exito!!',status:200})
         } catch (e) {
             res.send(e)
         }
    },
    borraralerta: async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await DB.alertas.update(data,{where:{ id }})
        res.send({msg:'la alera se borro con exito!!!',status:200})
    } catch (e) {
     res.send(e)
    }
    },


}
module.exports = alertaController;