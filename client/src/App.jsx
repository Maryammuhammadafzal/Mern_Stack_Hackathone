import { useState } from 'react'
import { Flex, Text, Button } from "@radix-ui/themes";

import './App.css'

function App() {


  return (
    <>
     <p>App</p>
     <Flex direction="column" gap="2">
			<Text>Hello from Radix Themes :)</Text>
			<Button>Let's go</Button>
		</Flex>
    </>
  )
}

export default App
