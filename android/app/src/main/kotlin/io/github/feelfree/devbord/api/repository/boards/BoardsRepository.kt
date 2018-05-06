package io.github.feelfree.devbord.api.repository.boards

import com.apollographql.apollo.ApolloClient
import io.github.feelfree.devbord.CreateBoardMutation
import io.github.feelfree.devbord.GetBoardByIdQuery
import io.github.feelfree.devbord.GetBoardsQuery
import io.github.feelfree.devbord.api.createApolloCall
import io.reactivex.Single

class BoardsRepository(val apolloClient: ApolloClient) : BoardsApi {
    override fun createBoard(name : String): Single<CreateBoardMutation.Data> {
        return createApolloCall(apolloClient.mutate(
                CreateBoardMutation.builder()
                        .name(name)
                        .build()))
    }

    override fun getBoards(): Single<GetBoardsQuery.Data> {
        return createApolloCall(apolloClient.query(
                GetBoardsQuery.builder()
                        .build()))
    }

    override fun getBoardById(id : String): Single<GetBoardByIdQuery.Data> {
        return createApolloCall(apolloClient.query(
                GetBoardByIdQuery.builder()
                        .id(id)
                        .build()))
    }
}