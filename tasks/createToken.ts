import { task } from 'hardhat/config'
const dotenv = require('dotenv')
const fs = require('fs')

task('createToken', 'create tokens')
	.addParam('user', 'User address')
	.addParam('uri', 'Token URI')
	.setAction(async ({ user, uri }, { ethers }) => {
		const envConfig = dotenv.parse(fs.readFileSync(".env"))
		for (const k in envConfig) {
			process.env[k] = envConfig[k]
		}
		const nft = process.env.NFT_ADDRESS as string;
		const contract = await ethers.getContractAt('NFT', nft)
		await contract.createToken(user, uri)
	})

task('grantRole', 'grant minter role')
	.addParam('user', 'User address')
	.addParam('role', 'keccak256 of the role')
	.setAction(async ({ user, role }, { ethers }) => {
		const envConfig = dotenv.parse(fs.readFileSync(".env"))
		for (const k in envConfig) {
			process.env[k] = envConfig[k]
		}
		const nft = process.env.NFT_ADDRESS as string;
		const contract = await ethers.getContractAt('NFT', nft)
		await contract.grantRole(role, user)
})
