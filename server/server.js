'use strict';

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');
// const bcrypt = require('bcrypt');

const {checkLogin} = require('./handlers/checkLogin');
const getInstitutionByName = require('./handlers/getInstitutionByName');
const {getSearchTerm} = require('./handlers/getSearchTerm');
const getRecordById = require('./handlers/getRecordById');
const getAllFonds = require('./handlers/getAllFonds');
const getAllRecords = require ('./handlers/getAllRecords');
const getRelatedRecordsByFondsId = require ('./handlers/getRelatedRecordsByFondsId');
const getFondsByFondsName = require('./handlers/getFondsByFondsName');
const handleUploadRecord = require('./handlers/handleUploadRecord');
const getRelatedRecordsByFondsIdAndRecordId = require('./handlers/getRelatedRecordsByFondsIdAndRecordId');
const handleUploadFonds = require('./handlers/handleUploadFonds');
const getAllFondsOfInstitution = require('./handlers/getAllFondsOfInstitution');
const getAllRecordsOfInstitution = require('./handlers/getAllRecordsOfInstitution');
const getFondsOfInstitutionByFondsName = require('./handlers/getFondsOfInstitutionByFondsName');
const getRecordOfInstitutionByRecordId = require ('./handlers/getRecordOfInstitutionByRecordId');
const addToSavedItems = require('./handlers/addToSavedItems');
const getSavedItems = require('./handlers/getSavedItems');
const deleteSavedItem = require('./handlers/deleteSavedItem');
const deleteRecord = require('./handlers/deleteRecord');
const deleteFonds = require('./handlers/deleteFonds');
const getSearchTermForInstitutions = require('./handlers/getSearchTermForInstitutions');
const getAllInstitutions = require('./handlers/getAllInstitutions');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

express()

.use(morgan('tiny'))

.use(express.static('public'))
.use(express.json())
.use(cors())

.get('/', (req, res) => {
    res
        .status(200)
        .json({ status: 200, message: "This is the homepage... it's empty :(" });
})

/// endpoints here below

.post('/login', checkLogin)

.get('/institutions', getAllInstitutions)

.get('/institutions/:institutionName', getInstitutionByName)

.get('/fonds', getAllFonds)

.get ('/fonds/:fondsName', getFondsByFondsName)

.get('/records', getAllRecords)

.get('/records/:recordId', getRecordById)

.get('/related-records/:fondsId', getRelatedRecordsByFondsId)

.get('/related-records/:fondsId/:recordId', getRelatedRecordsByFondsIdAndRecordId)

.get('/saved-items', getSavedItems)

.post('/saved-items', addToSavedItems)

.delete('/saved-items', deleteSavedItem)

.get('/:institutionName', getInstitutionByName)

.get('/:institutionName/fonds', getAllFondsOfInstitution)

.get('/:institutionName/fonds/:fondsName', getFondsOfInstitutionByFondsName)

.delete('/:institutionName/fonds', deleteFonds)

.delete('/:institutionName/fonds/:fondsName', deleteFonds)

.get('/:institutionName/records', getAllRecordsOfInstitution)

.get('/:institutionName/records/:recordId', getRecordOfInstitutionByRecordId)

.delete('/:institutionName/records', deleteRecord)

.delete('/:institutionName/records/:recordId', deleteRecord)

.get('/:institutionName/search/:query', getSearchTermForInstitutions)

.get('/guest/search/:query', getSearchTerm)

.post('/:institutionName/upload-record', upload.single('image'), handleUploadRecord)

.post('/:institutionName/upload-fonds', handleUploadFonds)


.get('*', (req, res) => {
    res
        .status(404)
        .json({
            status: 404,
            message: 'This is not the page you are looking for.',
        });
})

.listen(8888, () => console.log(`Listening on port 8888`));