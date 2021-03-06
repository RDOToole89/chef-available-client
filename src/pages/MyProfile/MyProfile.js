import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Calendar from '../../components/Calendar/Calendar.js';
import ImageUpload from '../../components/ImageUpload/imageUpload.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { selectToken, selectUser } from '../../store/userLogin/userLoginSelectors';
import { addUserTag, fetchUser, updateUserProfile } from '../../store/users/userActions';
import {
  selectSingleUser,
  selectSingleUserImage,
  selectSingleUserTags,
} from '../../store/users/userSelectors';
import './MyProfile.css';
import EditMode from './EditMode.js';
import { newMessageCount } from '../../store/messages/messageSelectors.js';
import TagBox from '../../components/TagBox/TagBox.js';
import { Button, FormControl, InputGroup, OverlayTrigger } from 'react-bootstrap';
import HoverToolTip from '../../components/HoverToolTip/HoverToolTip.js';
import { fetchUserMessages } from '../../store/messages/messageActions.js';

function MyProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUser).id;
  const singleUser = useSelector(selectSingleUser);
  const tags = useSelector(selectSingleUserTags);
  const chefProfileImg = useSelector(selectSingleUserImage);
  const newMessages = useSelector(newMessageCount);
  const profileId = parseInt(singleUser.profile?.id);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [editMode, setEditMode] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [imageModal, setImageModal] = useState(false);

  const [editProfile, setEditProfile] = useState({
    yearsOfExperience: singleUser.profile.yearsOfExperience || 'Experience...',
    hourlyRate: singleUser.profile.hourlyRate || 'Hourly Rate...',
    position: singleUser.profile.position || 'Position...',
    city: singleUser.city || 'City...',
    description: singleUser.profile.description || 'Description...',
  });

  if (!token || token === null) {
    history.push('/');
  }

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserMessages(userId));
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId, chefProfileImg]);

  const addTag = () => (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      dispatch(addUserTag(newTag, profileId));
      setNewTag('');
    }
  };

  const handleSaveProfile = () => {
    setEditMode(!editMode);
    dispatch(updateUserProfile(editProfile, userId, profileId));
  };

  return (
    <div className='MyProfile container'>
      <div className='MyProfile-top'>
        <div className='MyProfile-img-wrapper'>
          <OverlayTrigger placement='right' delay={{ show: 250, hide: 400 }} overlay={HoverToolTip}>
            <img
              onClick={() => setImageModal(!imageModal)}
              className='MyProfile-img'
              src={chefProfileImg}
              alt='chef'
            />
          </OverlayTrigger>
          {imageModal && <ImageUpload setImageModal={setImageModal} imageModal={imageModal} />}
        </div>
        <Link className='MyProfile-link' to='/profile/inbox'>
          <div className='MyProfile-msg'>
            <i className='las la-envelope la-2x'></i>
            {newMessages} new messages
          </div>
        </Link>
        <Link className='MyProfile-booking-link' to='/profile/bookings'>
          <Button variant='primary' className='MyProfile-booking-btn'>
            My Bookings
          </Button>{' '}
        </Link>
        <Link className='MyProfile-inbox-link' to='/profile/inbox'>
          <Button className='MyProfile-inbox-btn'>Inbox</Button>
        </Link>
      </div>

      <div className='MyProfile-main'>
        <div className='MyProfile-main-left'>
          <h4 className='MyProfile-main-heading'>
            Chef {`${singleUser.firstName} ${singleUser.lastName}`}
          </h4>
          <div className='MyProfile-main-detail-wrapper'>
            <p className='MyProfile-main-detail'>
              <span className='mr-2'>
                {' '}
                <i className='las la-user-cog'></i>
              </span>
              Years of experience: {singleUser.profile?.yearsOfExperience}
            </p>
            <p className='MyProfile-main-detail'>
              <span className='mr-2'>
                {' '}
                <i className='las la-euro-sign'></i>
              </span>
              Hourly rate: {singleUser.profile.hourlyRate}
            </p>
            <p className='MyProfile-main-detail'>
              <span className='mr-2'>
                {' '}
                <i className='las la-user-tag'></i>
              </span>
              {singleUser.profile?.position}
            </p>
            <p className='MyProfile-main-detail'>
              <span className='mr-2'>
                {' '}
                <i className='las la-map-marker-alt'></i>
              </span>
              {singleUser?.city}
            </p>
          </div>
          <div className='MyProfile-main-tagbox'>
            {editMode ? (
              <TagBox tags={tags} remove={true} />
            ) : (
              <TagBox tags={tags} remove={false} />
            )}
            {editMode && (
              <InputGroup className='mb-3'>
                <FormControl
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={addTag()}
                  value={newTag}
                  placeholder='Add a tag'
                  aria-label='add tag'
                  aria-describedby='basic-addon2'
                />
                <InputGroup.Append>
                  <Button onClick={addTag()} variant='outline-secondary'>
                    <i className='las la-check'></i>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            )}
          </div>
          <p className='MyProfile-main-description'>{singleUser.profile?.description}</p>
          {editMode && (
            <EditMode setEditProfile={setEditProfile} chef={singleUser} editProfile={editProfile} />
          )}
          {editMode ? (
            <div>
              <Button
                variant='success'
                className='MyProfile-editMode-btn'
                onClick={() => handleSaveProfile()}
              >
                Save
              </Button>
              <Button className='MyProfile-editMode-btn' onClick={() => setEditMode(!editMode)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant='secondary'
              className='MyProfile-editMode-btn'
              onClick={() => setEditMode(!editMode)}
            >
              Edit Profile
            </Button>
          )}
        </div>
        <div className='MyProfile-main-right'>
          <h1 className='MyProfile-main-right-header'>Availability</h1>
          <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
