/**
 * (c) 2010-2020 Diego Pereira. https://github.com/diegodsp/ngx-mini-audio-player/
 * License: MIT
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ngx-mini-audio-player',
    template: '<i class="fa" [class.fa-download]="buffering" [class.fa-play]="!buffering && !playing" [class.fa-pause]="!buffering && playing" (click)="onClick()"></i>'
})
export class MiniAudioPlayerComponent implements OnInit, OnDestroy {
    player = new Audio();
    playing = false;
    buffering = false;
    @Input() url: string;

    constructor(private route: ActivatedRoute) { }

    /**
     * Handle events.
     */
    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.ngOnDestroy();
        });
        this.player.onloadstart = () => {
            this.buffering = true;
        };
        this.player.onloadeddata = () => {
            this.buffering = false;
        };
    }

    /**
     * Detect change pages or recreate component.
     */
    ngOnDestroy(): void {
        this.buffering = false;
        this.playing = false;
        this.player?.pause();
    }

    /**
     * Handle the click to play/pause the audio.
     */
    onClick() {
        if (this.playing) {
            this.player.pause();
        } else {
            this.player.src = this.url;
            this.player.load();
            this.player.play();
        }
        this.playing = !this.playing;
    }
}
