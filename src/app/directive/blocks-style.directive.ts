import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blocksStyle'
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {

  @Input() selector:string;
  @Input() initFirst:boolean = false;

  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number;
  constructor(private el: ElementRef) { 

  }

  ngOnInit():void{
  }

  ngAfterViewInit(){
    this.activeElementIndex = 0
    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst) {
        if (this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute('style', 'border:3px solid red; font-weight:700; box-shadow: 10px 5px 5px rgb(149, 149, 149)');
        }
      }
    } else {
      console.error('Не передан селектор')
    }

    setTimeout(()=>{
      this.renderComplete.emit(true);
    })
  }

  ngOnChanges(data: SimpleChanges): void {
    
  }

  initKeyUp(ev: KeyboardEvent): void {
    console.log('ev', ev);
   
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
    (this.items[this.index] as HTMLElement).removeAttribute('style');
  }

    if (ev.key === 'ArrowRight') {
      this.index++;
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border:3px solid red; font-weight:700; box-shadow: 10px 5px 5px rgb(149, 149, 149)')
      } else if (this.items.length-1) {
        this.index= this.items.length-1;
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border:3px solid red; font-weight:700; box-shadow: 10px 5px 5px rgb(149, 149, 149)')
      }
     

    } else if (ev.key === 'ArrowLeft') {
      this.index --;
      if (this.items[this.index]){
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border:3px solid red; font-weight:700; box-shadow: 10px 5px 5px rgb(149, 149, 149)')
      } else if (this.index = -1){
        this.index = 0;
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border:3px solid red; font-weight:700; box-shadow: 10px 5px 5px rgb(149, 149, 149)')
      }
      
    }
    this.activeElementIndex = this.index;
    this.items[this.index].scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
  }

  initStyle(index:number){
    
    this.index = index;
    this.activeElementIndex = this.index;
   
    if( this.items[index]){
      (this.items[index] as HTMLElement).setAttribute('style', 'border:3px solid red; font-weight:700; box-shadow: 10px 5px 5px rgb(149, 149, 149)'); 
      }
    } 
  }



