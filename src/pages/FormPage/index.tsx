import { Card } from "antd";
import TournamentTable from './components/TournamentTable'
export default function ScoreManage() {
  return (
    <Card bordered={false}>
      <TournamentTable></TournamentTable>
    </Card>
  )
}
