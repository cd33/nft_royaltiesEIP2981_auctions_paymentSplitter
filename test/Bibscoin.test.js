const { BN, expectRevert } = require('@openzeppelin/test-helpers')
const { expect } = require('chai')

const Bibscoin = artifacts.require('Bibscoin')
const _decimals = new BN(18)

const readable = (val) => web3.utils.toWei(val, 'ether')
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// expect(XXX).to.be.bignumber.equal(XXX);
// expect(XXX).to.be.true; // or false

contract('BibsStaking', function (accounts) {
  let bibscoin
  const owner = accounts[0]
  const investor = accounts[1]

  describe('Bibs Staking Tests', async () => {
    beforeEach(async function () {
      bibscoin = await Bibscoin.new()
      await bibscoin.mint(owner, readable('100'), { from: owner })
    })

    describe('Bibscoin', async () => {
      it('a un nom', async function () {
        expect(await bibscoin.name()).to.equal('Bibscoin')
      })

      it('a un symbole', async function () {
        expect(await bibscoin.symbol()).to.equal('BIBS')
      })

      it('a une valeur décimal', async function () {
        expect(await bibscoin.decimals()).to.be.bignumber.equal(_decimals)
      })

      it('REVERT: mint() not owner', async function () {
          await expectRevert(bibscoin.mint(investor,readable('100'), { from: investor }), 'Ownable: caller is not the owner');
      });
    })
  })
})
