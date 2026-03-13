#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Song {
    char name[50];
    struct Song *prev;
    struct Song *next;
};

struct Song *head = NULL;
struct Song *tail = NULL;
struct Song *current = NULL;

void addSong(char name[]) {
    struct Song *newSong = (struct Song*)malloc(sizeof(struct Song));
    strcpy(newSong->name, name);
    newSong->next = NULL;
    newSong->prev = NULL;

    if(head == NULL) {
        head = tail = newSong;
    } else {
        tail->next = newSong;
        newSong->prev = tail;
        tail = newSong;
    }
}

void playNext() {
    if(current == NULL)
        current = head;
    else if(current->next != NULL)
        current = current->next;
    else {
        printf("Already at last song\n");
        return;
    }

    printf("Playing: %s\n", current->name);
}

void playPrevious() {
    if(current == NULL)
        current = head;
    else if(current->prev != NULL)
        current = current->prev;
    else {
        printf("Already at first song\n");
        return;
    }

    printf("Playing: %s\n", current->name);
}

void showPlaylist() {
    struct Song *temp = head;
    printf("Playlist:\n");
    while(temp != NULL) {
        printf("%s\n", temp->name);
        temp = temp->next;
    }
}

int main() {
    addSong("Song1");
    addSong("Song2");
    addSong("Song3");
    addSong("Song4");

    showPlaylist();

    printf("\n--- Music Slider ---\n");
    playNext();
    playNext();
    playNext();
    playPrevious();
    playPrevious();

    return 0;
} 
