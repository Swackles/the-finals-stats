import {UserStatsV2Store} from "./UserStatsV2Store";
import {useStore} from "@common/stores";
import {observer} from "mobx-react";
import {useEffect} from "react";
import MockedGameStats from "@common/data/mockedGameStats.json"
import { Sidebar } from "./components/sidebar";
import {GameModeTabs} from "./components/GameModeTabs";
import Box from "@mui/joy/Box";
import {WeaponsPanel} from "./panels/weaponsPanel/WeaponsPanel";
import {MatchHistoryPanel} from "./panels/matchHistoryPanel/MatchHistoryPanel";
import {OverviewPanel} from "./panels/overviewPanel/OverviewPanel";

export interface UserStatsProps {
  isMocked: boolean
}

export const UserStatsV2 = observer(({ isMocked }: UserStatsProps) => {
  const store = useStore(UserStatsV2Store.new)

  useEffect(() => {
    store.fetchData(undefined, isMocked ? MockedGameStats : undefined)
  }, [store, isMocked])

  if (store.isLoading) return <></>

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar activeTab={store.activeTab} setActiveTab={store.setActiveTab} />
        <Box
            sx={{
                px: { xs: 2, md: 6 },
                pt: {
                    xs: 'calc(12px + var(--Header-height))',
                    sm: 'calc(12px + var(--Header-height))',
                    md: 3,
                },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '100dvh',
                gap: 1,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: 1 }}>
                {store.activeTab !== "match-history" && <GameModeTabs gameMode={store.gameMode} onGameModeChange={store.setGameMode}/>}
                {store.activeTab === "overview" && <OverviewPanel
                    data={store.statsSummary}
                    classesTableData={store.getClassesTableRows}
                    timePlayed={store.getTimePlayed}/> }
                {store.activeTab === "weapons" && <WeaponsPanel weaponTableData={store.weaponTableRows} />}
                {store.activeTab === "match-history" && <MatchHistoryPanel tournaments={store.tournaments} />}
            </Box>
        </Box>
    </Box>
  )
})
