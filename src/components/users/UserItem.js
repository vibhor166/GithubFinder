import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
const UserItem = ({ user: { avatar_url, login, html_url } }) => {
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: '60px' }}
      />
      <h5>{login}</h5>
      <Link to={`/user/${login}`} className='btn btn-dark'>
        More
      </Link>
    </div>
  );
};
UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;
