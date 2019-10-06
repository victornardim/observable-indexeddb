import { Component, OnInit, OnDestroy } from '@angular/core';
import { Database } from './services/model/database.model';
import { DatabaseService } from './services/database.service';
import { Person } from './model/person.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  database: Database;
  people: Person[];

  databaseInitSubscribe: Subscription;

  databaseSetted: boolean;
  databaseInitted: boolean;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.people = [];
    this.databaseSetted = false;
    this.databaseInitted = false;
  }

  ngOnDestroy() {
    this.databaseInitSubscribe.unsubscribe();
  }

  getPeople(): string {
    return JSON.stringify(this.people);
  }

  setup() {
    this.database = {
      name: 'sample_database',
      version: 1,
      objectStores: [
        {
          name: 'person',
          keyPath: 'id',
          autoIncrement: true,
          indexes: [
            {
              name: 'id',
              keyPath: 'id',
              unique: true
            },
            {
              name: 'name',
              keyPath: 'name',
              unique: false
            },
            {
              name: 'document',
              keyPath: 'document',
              unique: true
            }
          ]
        }
      ]
    };

    this.databaseService.setup(this.database);
    this.databaseSetted = true;
  }

  init() {
    this.databaseInitSubscribe = this.databaseService.init()
      .subscribe(() => {
        this.databaseInitted = true;
      },
        error => alert(error));
  }

  insert() {
    const person = Object.assign(new Person(), {
      name: 'Sir Test',
      document: '123456789'
    });

    const subscription = this.databaseService
      .insert('person', person).
      subscribe(id => {
        person.id = id;
        this.people.push(person);
      },
        error => alert(error),
        () => subscription.unsubscribe());
  }

  loadById() {
    const subscription = this.databaseService
      .load('person', 1)
      .subscribe(person => {
        if (person) {
          this.people.push(person);
        }
      },
        error => alert(error),
        () => subscription.unsubscribe());
  }

  loadByIndex() {
    const subscription = this.databaseService
      .loadByIndex('person', 'document', '123456789')
      .subscribe(person => {
        if (person) {
          this.people.push(person);
        }
      },
        error => alert(error),
        () => subscription.unsubscribe());
  }

  loadAll() {
    const subscription = this.databaseService
      .loadAll('person')
      .subscribe(people => {
        this.people = people;
      },
        error => alert(error),
        () => subscription.unsubscribe());
  }

  updateById() {
    const subscription = this.databaseService
      .update('person', 1, {
        name: 'Mr Test'
      })
      .subscribe(() => {
        this.loadAll();
      },
        error => alert(error),
        () => subscription.unsubscribe());
  }

  updateByIndex() {
    const subscription = this.databaseService
      .updateByIndex('person', 'document', '123456789', {
        name: 'Mr Test'
      })
      .subscribe(() => {
        this.loadAll();
      },
        error => alert(error),
        () => subscription.unsubscribe());
  }

  delete() {
    const subscription = this.databaseService
      .delete('person', 1)
      .subscribe(() => {
        this.loadAll();
      },
        error => alert(error),
        () => subscription.unsubscribe());
  }

  deleteDatabase() {
    const subscription = this.databaseService
      .deleteDatabase()
      .subscribe(
        () => alert('Database deleted'),
        error => alert(error),
        () => subscription.unsubscribe());
  }
}
