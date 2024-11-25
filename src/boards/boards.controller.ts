import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { StatusValidation } from './custom-pipes/StatusValidationPipe';
import { Board } from './entity/board.entity';
import { BoardStatus } from './boards-status.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private readonly logger = new Logger(`BoardsController`);
  constructor(private readonly boardsService: BoardsService) { }

  @Get()
  getAllBoards(@Req() req): Promise<Board[]> {
    this.logger.verbose(`User ${req.user.username} is trying to get all boards`)
    return this.boardsService.getAllBoards(req)
  }

  @Get('/:id')
  getBoard(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoard(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() CreateBoardDto: CreateBoardDto,
    @Req() req
  ): Promise<Board> {
    this.logger.verbose(
      `User ${req.user.username} is creating a new board Payload: ${JSON.stringify(CreateBoardDto)}`)
    return this.boardsService.createBoard(CreateBoardDto, req);
  };

  @Delete("/:id")
  deleteBoard(@Param('id', ParseIntPipe) id: number, @Req() req): Promise<boolean> {
    return this.boardsService.deleteBoard(id, req);
  }

  @Patch("/:id/status")
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', StatusValidation) status: BoardStatus): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
