const express = require("express");
const path = require("path");
const fs = require("fs");
const DB = require("../database/models2");

const reportesController = {
remito:async (req, res) => {
    try {
      let res = await DB.w_remitos.findAll();
      console.log(res);
      res.json(res);
    } catch (error) {
      res.send(error);
    }
  },
}
module.exports = reportesController;