const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const { isAuthenticated} = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
 res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
 const { NumCuenta, nombreCli, banco, saldo, description}=req.body;
 const errors = [];
 if(!NumCuenta){
   errors.push({text: 'El campo no debe estar vacío, debes escribir un numero de cuenta'});
 }
 if(!nombreCli){
   errors.push({text: 'El campo no debe estar vacío, debes escribir el nombre del cliente'});
 }
 if(!banco){
   errors.push({text: 'El campo no debe estar vacío, debes escribir un banco'});
 }
 if(!saldo){
   errors.push({text: 'El campo no debe estar vacío, debes escribir el saldo'});
 }
 if(!description){
   errors.push({text: 'El campo no debe estar vacío, debes escribir una descripción'});
 }
 if(errors.length > 0) {
   res.render('notes/new-note', {
     errors,
     NumCuenta,
     nombreCli,
     banco,
     saldo,
     description
   });
 } else {
  const newNote = new Note({ NumCuenta, nombreCli, banco, saldo, description });
  await newNote.save();
  req.flash('success_msg', 'Cuenta agregada correctamente');
  res.redirect('/notes');
 }
});

router.get('/notes', isAuthenticated,async (req, res) => {
  const notes = await Note.find();
  res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
   const note = await Note.findById(req.params.id);
  res.render('notes/edit-note', {note});
});

router.put('/notes/edit-note/:id',isAuthenticated, async (req, res) => {
  const {NumCuenta, nombreCli, banco, saldo, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {NumCuenta, nombreCli, banco, saldo, description});
  req.flash('success_msg', 'Cuenta editada correctamente');
  res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
 await Note.findByIdAndDelete(req.params.id);
 req.flash('success_msg', 'Cuenta eliminada correctamente');
 res.redirect('/notes');
});

module.exports = router;