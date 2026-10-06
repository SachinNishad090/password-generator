import { useState, useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength]=useState(8)
  const [numberAllowed, setNumberALLowed]=useState(false);
  const [charAllowed,setCharALLowed]=useState(false)
  const [password, setpassword]= useState("")

  //useRef
  const passwordRef = useRef(null);

  const passwordGenrator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str +="0123456789"
    if(charAllowed) str +="!@#$%^&*-_+=[]{}~~`"

    for(let i=0; i<length; i++)
    {
      let char= Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)

    }

    setpassword(pass)

  }, [length,numberAllowed, charAllowed, setpassword])

  const copyPaswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0, 12);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => 
  {
     passwordGenrator()
  }, [length, numberAllowed,charAllowed,passwordGenrator])
  return (
   <>
   <div className="w-full max-w-md mx-auto shadow-md 
   rounded-lg px-4 my-8 text-orange-500 bg-gray-800
   ">

    <h1 className='text-white text-center my-3'>Password generator</h1>
     <div className='className="flex shadow
     rounded-lg overflow-hidden mb-4" '>
      <input 
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef} 
      />
      <button
      onClick={copyPaswordToClipboard}
      className='outline-none bg-blue-700 text-white
      px-3 py-0.5 shrink-0'
      >copy</button>

     </div>

     <div className='flex text-sm gap-x-2'>
      <div className='flex item-centre gap-x-1'>
        <input 
        type="range"
        min={8}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length {length}</label>

     </div>

        <div className="flex item-center gap-x-1">
         <input 
         type="checkbox"
         defaultChecked={numberAllowed}
         id="numberInput"
         onChange={() => {
          setNumberALLowed(prev => !prev);
         }} 
         />
         <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex item-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id="charecterInput"
          onChange={() =>{
            setCharALLowed((prev) => !prev);
          }}
           />

          <label htmlFor="charecterInput">Charecters
          </label>
        </div>

     </div>

   </div>
   </>
  )
}

export default App
