// ********************************************

// Inutile au projet, à développer plus tard...

// ********************************************

// contract MarketPlace {
//     uint8 public platformFee = 50; // 5%    
    
//     struct Auction {
//         uint8 tokenId;
//         address seller;
//         address collaborator;
//         address highestBidder;
//         uint256 price;
//         uint256 timeStamp;
//         bool finished;
//     }

//     // Mapping from account to his number of NFTs
//     mapping(uint8 => Auction) private _auctionDetails;

//     /**
//      * @dev Emitted when the msg.sender create an auction.
//      */
//     event AuctionCreated(uint8 _tokenId, address _seller, uint256 _price);

//     /**
//      * @dev Emitted when the msg.sender bids on an auction
//      */
//     event AuctionBidden(uint8 _tokenId, address _highestBidder, uint256 _price);

//     /**
//      * @dev Emitted when the msg.sender claim his rewards
//      */
//     event AuctionFinished(uint8 _tokenId, address _highestBidder);

//     function createAuction(uint8 _tokenId, uint256 _price, address _collaborator) external {
//         require(_ownerOf(_tokenId), "You don't own this NFT");
//         _auctionDetails[_tokenId] = Auction(_tokenId, msg.sender, _collaborator, address(0), _price, 0, false);
//         emit AuctionCreated(_tokenId, msg.sender, _price);
//     }

//     function bid(uint8 _tokenId) external payable {
//         require(_auctionDetails[_tokenId].tokenId == _tokenId, "Auction doesn't exist"); // simple way to check that the auction exists
//         require(_auctionDetails[_tokenId].timeStamp + 120 < block.timestamp, "Auction already finished");
//         require(msg.value > _auctionDetails[_tokenId].price, "You have to outbid");

//         address lastHighestBidder = _auctionDetails[_tokenId].highestBidder;
//         uint256 lastPrice = _auctionDetails[_tokenId].price;
        
//         _auctionDetails[_tokenId].price = msg.value;
//         _auctionDetails[_tokenId].highestBidder = msg.sender;
//         _auctionDetails[_tokenId].timeStamp = block.timestamp;
        
//         payable(lastHighestBidder).transfer(lastPrice);
//         emit AuctionBidden(_tokenId, msg.sender, msg.value);
//     }

//     function claimRewards(uint8 _tokenId) external {
//         require(msg.sender == _auctionDetails[_tokenId].highestBidder || msg.sender == _auctionDetails[_tokenId].seller || msg.sender == _auctionDetails[_tokenId].collaborator, "Not allowed to claim reward");
//         require(!_auctionDetails[_tokenId].finished, "Rewards already claimed");
//         require(_auctionDetails[_tokenId].timeStamp + 120 >= block.timestamp, "Auction not finished yet");
        
//         _auctionDetails[_tokenId].finished = true;
//         uint256 platformAmount = (_auctionDetails[_tokenId].price * platformFee) / 1000;
//         uint256 sellerAmount = _auctionDetails[_tokenId].price - platformAmount;

//         payments.transfer(platformAmount);
//         if (_auctionDetails[_tokenId].collaborator == address(0)) {
//             payable(_auctionDetails[_tokenId].seller).transfer(sellerAmount);
//         } else {
//             payable(_auctionDetails[_tokenId].seller).transfer((sellerAmount * 50) / 100);
//             payable(_auctionDetails[_tokenId].collaborator).transfer((sellerAmount * 50) / 100);
//         }
//         safeTransferFrom(_auctionDetails[_tokenId].seller, _auctionDetails[_tokenId].highestBidder, _tokenId, 1, "");

//         emit AuctionFinished(_tokenId, msg.sender);
//     }
// }