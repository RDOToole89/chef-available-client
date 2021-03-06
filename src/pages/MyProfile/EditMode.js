import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

import "./MyProfile.css";

function EditMode({ setEditProfile, editProfile }) {
  return (
    <div className="MyProfile-editMode-wrapper">
      <h5>Edit profile details...</h5>

      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="las la-user-cog"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onChange={(e) => setEditProfile({ ...editProfile, yearsOfExperience: e.target.value })}
          defaultValue={editProfile.yearsOfExperience}
          aria-label="experience"
        />
      </InputGroup>
      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="las la-euro-sign"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onChange={(e) => setEditProfile({ ...editProfile, hourlyRate: e.target.value })}
          defaultValue={editProfile.hourlyRate}
          aria-label="rate"
        />
      </InputGroup>
      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="las la-user-tag"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onChange={(e) => setEditProfile({ ...editProfile, position: e.target.value })}
          defaultValue={editProfile.position}
          aria-label="rate"
        />
      </InputGroup>
      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="las la-map-marker-alt"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onChange={(e) => setEditProfile({ ...editProfile, city: e.target.value })}
          defaultValue={editProfile.city}
          aria-label="rate"
        />
      </InputGroup>

      <InputGroup>
        <FormControl
          onChange={(e) => setEditProfile({ ...editProfile, description: e.target.value })}
          defaultValue={editProfile.description}
          as="textarea"
          aria-label="description"
          rows={6}
        />
      </InputGroup>
    </div>
  );
}

export default EditMode;
