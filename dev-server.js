const express = require('express')
const path = require('path')
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

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')))

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`) // eslint-disable-line no-console
})
