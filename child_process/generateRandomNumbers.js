process.on('message', amount => {
  const generatedNumbers = {}

  for (let i = 0; i < amount; i++) {
    const randomNumber = Math.floor(Math.random() * 1000) + 1
    
    generatedNumbers[randomNumber] ? generatedNumbers[randomNumber]++ : generatedNumbers[randomNumber] = 1
  }

  process.send(generatedNumbers)
})