import './styles.css';
import noResultsIcon from './assets/noResults.svg';
import profileIcon from './assets/profileXIcon.svg';

const NoResults = () => {
  return (
    <div className='no-results-container'>
      <img className='profile-icon' src={profileIcon} alt='' />
      <img src={noResultsIcon} alt='' />
      <h1>Nenhum resultado foi encontrado!</h1>
      <h2>Verifique se a escrita está correta</h2>
    </div>
  );
};

export default NoResults;
