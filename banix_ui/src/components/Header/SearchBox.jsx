import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBox = () => {
  return (
    <>
      <InputGroup>
        <FormControl
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
        <InputGroup.Append>
          <div className="input-group-text bg-transparent">
            <FontAwesomeIcon icon="search" />
          </div>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};

export default SearchBox;
