import PaddedView from "@components/atoms/PaddedView"
import DataContainer from "@components/layouts/DataContainer"
import { spacing } from "@constants/globalStyles"

import React from "react"
import { FlatList, RefreshControl } from "react-native-gesture-handler"
import Ticket from "./components/Ticket"

export default function TicketList({ tickets, getTickets }) {
  return (
    <DataContainer
      data={tickets.data}
      error={tickets.error}
      loading={tickets.loading}
      noDataMessage={"No tickets available for this package right now."}
    >
      <PaddedView vertical={spacing.md}>
        <FlatList
          data={tickets.data}
          numColumns={1}
          contentContainerStyle={{ gap: spacing.lg }}
          refreshControl={
            <RefreshControl
              refreshing={tickets.loading}
              onRefresh={getTickets}
            />
          }
          renderItem={({ item }) => <Ticket ticket={item} />}
        />
      </PaddedView>
    </DataContainer>
  )
}
