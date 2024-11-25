import { Repository } from "typeorm";
import { Board } from "./entity/board.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./boards-status.enum";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly repository: Repository<Board>
  ) { }

  async getAllBoards(req): Promise<Board[]> {
    const query = this.repository.createQueryBuilder('board');
    query.where('board.userId =:userId', { userId: req.user.id })

    return query.getMany();
  }

  async getBoard(id: number): Promise<Board> {
    const board = await this.repository.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} don't exist`)
    }
    return board;

  }

  async createBoard(CreateBoardDto: CreateBoardDto, req): Promise<Board> {
    const { title, description } = CreateBoardDto;
    const board = this.repository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user: req.user
    });
    await this.repository.save(board);
    return board;
  }

  async deleteBoard(id: number, req): Promise<boolean> {
    const result = await this.repository.delete({ id, user: { id: req.user.id } });
    if (!result.affected) {
      throw new NotFoundException(`Board with ID ${id} don't exist`)
    }
    return true;
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoard(id);
    board.status = status;
    await this.repository.save(board);
    return board;
  }
}