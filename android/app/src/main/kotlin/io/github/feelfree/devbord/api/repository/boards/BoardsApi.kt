package io.github.feelfree.devbord.api.repository.boards

import io.github.feelfree.devbord.CreateBoardMutation
import io.github.feelfree.devbord.GetBoardByIdQuery
import io.github.feelfree.devbord.GetBoardsQuery
import io.reactivex.Single

interface BoardsApi {
    fun getBoards() : Single<GetBoardsQuery.Data>
    fun getBoardById(id : String) : Single<GetBoardByIdQuery.Data>
    fun createBoard(name : String) : Single<CreateBoardMutation.Data>
}