import { sequence } from '0xsequence'

async function main() {
  const wallet = new sequence.Wallet('polygon', {
    walletAppURL : 'http://localhost:3333'
  })
  await wallet.disconnect()

  const connectDetails = await wallet.connect({keepWalletOpened: true})
  console.log(connectDetails)

  // Get the wallet provider and signer instances
  const provider = wallet.getProvider()
  const signer = wallet.getSigner()

  // Prepare the message string
  const message = `I've been to Web3 & back again :D`

  // Sign the message
  const signature = await signer.signMessage(message)
  console.log('message signature:', signature)

  // Validate the signed message. The sequence utils `isValidMessageSignature` method
  // supports validating both EOA and Smart Wallet (EIP1271) signatures with this simple call.
  const isValid = await sequence.utils.isValidMessageSignature(
    await wallet.getAddress(),
    message,
    signature,
    provider
  )

  console.log('isValid?', isValid)
  if (!isValid) throw new Error('signature is invalid')

  let elem = document.createElement('div')
  elem.id = 'signature'
  elem.innerText = signature
  document.body.appendChild(elem)
}

document.getElementById('go').addEventListener('click', main)
