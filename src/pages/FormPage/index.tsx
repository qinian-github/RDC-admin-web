import { Card } from 'antd';
import TournamentTable from './components/TournamentTable';
import { MyContextProvider } from './components/MyContextProvider';
export default function ScoreManage() {
  return (
    <Card bordered={false}>
      <MyContextProvider>
        <TournamentTable></TournamentTable>
      </MyContextProvider>
    </Card>
  );
}
