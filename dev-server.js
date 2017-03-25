const express = require('express')
const fs = require('fs')
const data = require('./assets/item-data.json')

const app = express()

app.set('port', (process.env.PORT || 3001))

app.get('/api/product/:id', (req, res) => {
	const id = req.params.id
	const item = data.CatalogEntryView.find(entry => entry.itemId === id)

	res.json(!!Object.keys(item).length ? item : {
		error: `Can not find item ${id}`
	})
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
})
