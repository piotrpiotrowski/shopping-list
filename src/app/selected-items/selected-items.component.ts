import {Component, OnInit} from '@angular/core';
import {ListService} from '../list/list.service';
import {Item} from '../list/item.model';
import {HistoryService} from '../history/history.service';
import {DescriptorParserService} from "../parser/descriptor-parser.service";
import {PresentationMode} from "./presentation-mode.enum";
import {LoaderService} from "../loader.service";

@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.component.html',
  styleUrls: ['./selected-items.component.scss']
})
export class SelectedItemsComponent implements OnInit {
  private mode: PresentationMode = PresentationMode.VIEW;
  private items: Item[] = [];
  arrangedItems: Item[] = [];
  text: string = '';

  constructor(
    public listService: ListService,
    private historyService: HistoryService,
    private descriptorParserService: DescriptorParserService,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.loaderService.load()
      .subscribe(() => {
        this.initView();
      });
  }

  changeLineState(item: Item) {
    item.flipState();
    this.arrangedItems = this.arrangeItems();
    this.historyService.addEntry(this.items);
  }

  findChecked = () => this.items.filter((line) => line.isStateChecked());

  findNotChecked = () => this.items.filter((line) => !line.isStateChecked());

  isModeView = () => this.mode === PresentationMode.VIEW;

  isModeEdit = () => this.mode === PresentationMode.EDIT;

  openEditMode() {
    this.mode = PresentationMode.EDIT;
    this.text = this.listService.getItemsAsText();
  }

  saveChanges() {
    this.mode = PresentationMode.VIEW;
    this.listService.unselectAll();
    this.listService.select(this.descriptorParserService.parse(this.text));
    this.populateSelectedItems();
  }

  calculateNumberOfRows = () => Math.max(5, this.text.split('\n').length);

  private initView() {
    this.populateSelectedItems();
    this.mode = this.discoverMode();
  }

  private discoverMode = () => this.listService.getSelectedItems().length === 0 && this.text.length === 0 ? PresentationMode.EDIT : PresentationMode.VIEW;

  private arrangeItems = () => this.findNotChecked().concat(this.findChecked());

  private populateSelectedItems = () => {
    this.items = this.listService.getSelectedItems()
      .sort((item1, item2) => item1.weight - item2.weight || item1.descriptor.name.localeCompare(item2.descriptor.name));
    this.arrangedItems = this.arrangeItems();
    this.historyService.addEntry(this.items);
  };
}
