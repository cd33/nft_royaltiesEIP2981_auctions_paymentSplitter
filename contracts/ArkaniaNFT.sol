// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

/** @title Arkania NFT */
contract ArkaniaNFT is ERC1155, Ownable, IERC2981 {

    address payable public payments;

    struct Auction {
        uint8 tokenId;
        address highestBidder;
        uint256 price;
        uint256 timeStamp;
        bool finished;
    }

    // Mapping from account to his number of NFTs
    mapping(uint8 => Auction) private _auctionDetails;

    // Mapping from account to his number of NFTs
    mapping(address => uint8) private _balanceOfNFTs;

    /**
     * @dev Emitted when the msg.sender buy a NFT.
     */
    event NFTBought(uint8 nftId);

    /**
     * @dev Emitted when the msg.sender bids on an auction
     */
    event AuctionBidden(uint8 _tokenId, address _highestBidder, uint256 _price);

    /**
     * @dev Emitted when the msg.sender claim his rewards
     */
    event AuctionFinished(uint8 _tokenId, address _highestBidder);

    /**
     * @dev Constructor of the contract ERC1155 with a payment splitted
     * @param _payments Address of the contract Payment Splitter.
    */
    constructor (address _payments) ERC1155("ipfs://QmdjHKGGTrpK173GVr7JATFVUXCYkEWZNxH89tgvFoMHwH/{id}.json") {
        payments = payable(_payments);
        for (uint8 i = 1; i<=10; i++) {
            _mint(address(this), i, 1, bytes(abi.encodePacked("Arkania NFT #", Strings.toString(i))));
        }
        for (uint8 i = 11; i<=20; i++) {
            _auctionDetails[i] = Auction(i, address(0), 0.001 ether, 0, false);
        }
    }

    /**
     * @dev Return the name of the contract
     */
    function name() public pure returns(string memory) {
        return "Arkania NFT";
    }

    /**
     * @dev Change the token's image URI, override for OpenSea traits compatibility.
     * @param _tokenId Id of the token.
     */
    function uri(uint256 _tokenId) override public pure returns(string memory) {
        return string(abi.encodePacked(
            "ipfs://QmdjHKGGTrpK173GVr7JATFVUXCYkEWZNxH89tgvFoMHwH/",
            Strings.toString(_tokenId),
            ".json"
        ));
    }

    function contractURI() public view returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/QmdjHKGGTrpK173GVr7JATFVUXCYkEWZNxH89tgvFoMHwH/_metadata.json";
    }

    /**
     * @dev Tip to simulate the function ownerOf of ERC721, check if msg.sender is owner of the token.
     * @param _tokenId Id of the token.
     * @return Boolean, true of false.
     */
    function _ownerOf(uint256 _tokenId) private view returns(bool) {
        return balanceOf(msg.sender, _tokenId) != 0;
    }

    /**
     * @dev The function allows you to buy a NFT
     * @param tokenId Id of the nft.
     * Emits a "NFTBought" event.
     */
    function buyNFT(uint8 tokenId) external payable {
        require(tokenId < 10, "Non-existent NFT");
        require(balanceOf(address(this), tokenId) != 0, "NFT no more available");
        require(msg.value == 0.001 ether, "Wrong amount of fees");
        _balanceOfNFTs[msg.sender]++;
        payments.transfer(msg.value);
        this.safeTransferFrom(address(this), msg.sender, tokenId, 1, "");
        emit NFTBought(tokenId);
    }

    function bid(uint8 _tokenId) external payable {
        require(_tokenId > 10 && _tokenId <= 20, "Wrong tokenId");
        require(_auctionDetails[_tokenId].timeStamp == 0 || _auctionDetails[_tokenId].timeStamp + 120 >= block.timestamp, "Auction already finished");
        require(msg.value > _auctionDetails[_tokenId].price, "You have to outbid");

        address lastHighestBidder = _auctionDetails[_tokenId].highestBidder;
        uint256 lastPrice = _auctionDetails[_tokenId].price;
        
        _auctionDetails[_tokenId].price = msg.value;
        _auctionDetails[_tokenId].highestBidder = msg.sender;
        _auctionDetails[_tokenId].timeStamp = block.timestamp;
        
        payable(lastHighestBidder).transfer(lastPrice);
        emit AuctionBidden(_tokenId, msg.sender, msg.value);
    }

    function claimRewards(uint8 _tokenId) external {
        require(_tokenId > 10 && _tokenId <= 20, "Wrong tokenId");
        require(msg.sender == _auctionDetails[_tokenId].highestBidder, "Not allowed to claim reward");
        require(!_auctionDetails[_tokenId].finished, "Rewards already claimed");
        require(_auctionDetails[_tokenId].timeStamp + 120 <= block.timestamp, "Auction not finished yet");
           
        _auctionDetails[_tokenId].finished = true;
        
        payments.transfer(address(this).balance);
        _mint(msg.sender, _tokenId, 1, bytes(abi.encodePacked("Arkania NFT #", Strings.toString(_tokenId))));
        _balanceOfNFTs[msg.sender]++;

        emit AuctionFinished(_tokenId, msg.sender);
    }

    /**
     * @dev The function returns an array with the characteristics of all my NFTs.
     * @return Array of characters.
     */
    function getMyNFTs() external view returns(uint8[] memory){
        uint8 count;
        uint8[] memory myNFTs = new uint8[](_balanceOfNFTs[msg.sender]);
        for (uint8 i = 0; i <= 20; i++) {
            if (_ownerOf(i)) {
                myNFTs[count] = i;
                count++;
            }
        }
        return myNFTs;
    }

    /**
     * @dev The function returns an array with the characteristics of all my NFTs.
     * @return Array of characters.
     */
    function getAuctions() external view returns(Auction[] memory){
        uint8 count;
        Auction[] memory auctions = new Auction[](10);
        for (uint8 i = 11; i <= 20; i++) {
            auctions[count] = _auctionDetails[i];
            count++;
        }
        return auctions;
    }

    // EIP2981 standard royalties return.
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view override
        returns (address receiver, uint256 royaltyAmount)
    {
        return (payments, (_salePrice * 1000) / 10000);
    }

    // EIP2981 standard Interface return. Adds to ERC1155 and ERC165 Interface returns.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, IERC165)
        returns (bool)
    {
        return (
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId)
        );
    }
}