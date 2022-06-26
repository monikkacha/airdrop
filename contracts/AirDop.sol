//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AirDop is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(address => bool) claimableIds;
    string private URI =
        "https://nft-marketplace-monik.herokuapp.com/nft/620510cb8e336ffd45ef099d";

    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {}

    function addClaim(address claimAddress) public {
        claimableIds[claimAddress] = false;
    }

    function claim() public {
        require(
            !claimableIds[msg.sender],
            "You are not eligible to claim the AirDop or you have already claimed!"
        );
        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _safeMint(msg.sender, id);
        _setTokenURI(id, URI);
        claimableIds[msg.sender] = true;
    }

    function getTokenURI(uint256 id) public view returns (string memory) {
        return tokenURI(id);
    }
}
