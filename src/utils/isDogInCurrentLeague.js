import currentLeague from '@/utils/currentLeague';

export default function(snapshot) {
	const leagues = snapshot.get('leagues');

	if (!leagues) return false;

	const leagueName = currentLeague();

	return Object.keys(leagues).includes(leagueName);
}
