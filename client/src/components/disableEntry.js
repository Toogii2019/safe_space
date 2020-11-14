import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import {posting, posts} from '../utils/API';
import EntryContent from './EntryContent';
document.getElementById('entry')

if ($(window).width() <= 738) { // Set when you want it removed

    $(entry).remove();
   
   }