import { Game } from './model/game.model';
import { GamesService } from './services/games.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import './components/game-entry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  allGames: Game[] = [];
  catagories: string[] = [];

  filterForm: FormGroup;

  constructor(
    private gamesService: GamesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      category: new FormControl(),
      filter: new FormControl()
    });

    this.filterForm.controls.category.setValue('all');

    this.gamesService.getGames().subscribe((games: Game[]) => {
      this.allGames = games;
      this.catagories = this.findUniqueCategories(games);
    });

  }

  findUniqueCategories(games: Game[]): string[] {

    const categories = [];

    games.forEach(game => {

      game.categories.forEach(cat => {
        if (categories.indexOf(cat) === -1) {
          categories.push(cat);
        }
      });

    });

    return categories;

  }

  formatCategoryName(cat: string): string {

    return cat.charAt(0).toUpperCase() + cat.substring(1);

  }

  getFilteredGames(): Game[] {

    const category = this.filterForm.controls.category.value;
    const filter = this.filterForm.controls.filter.value;

    let filteredGames = [...this.allGames];

    if (category && category !== 'all') {
      filteredGames = filteredGames.filter(game => game.categories.indexOf(category) !== -1);
    }

    if (filter) {
      filteredGames = filteredGames.filter(game => game.gameName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }

    return filteredGames;

  }

  previewGame(url: string): void {

    window.open(url, '_blank');

  }

}
