import { TournamentInstance  } from '@/api';
import { listAllTournamentRes, listAllTournament,TournamentItem,DeleteTournament} from './types';

const { get, post } = TournamentInstance ;

const GetAllTournament= () => {
  return get<listAllTournament>("/list");
};

const updateTournament = (data: listAllTournamentRes) => {
  return post('/update', data)
}
const SearchTournament = (name: string) => {
  return get('/searchByName',{name})
}


const addTournament = (data:listAllTournamentRes) => {
  return post('/add', data, null)
}

const deleteTournament = (ids:DeleteTournament) => {
  return get('/deleteTournament', {ids})
}

export { GetAllTournament,SearchTournament, updateTournament, addTournament, deleteTournament };
