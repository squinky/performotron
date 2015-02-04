The Perform-O-Tron™
============

This is the Perform-O-Tron™, which powers the intentionally-awkward, computer-assisted, audience-participatory interactive theatre performance, "Coffee: A Misunderstanding". Yay!

## How to run a game

1. Designate any computer as the server. Download the source code to the project. Install <a href="http://www.nodejs.org/">node.js</a>.
2. Create a local ad-hoc network on your computer or install a tunnel such as <a href="http://ngrok.com">ngrok</a>, to allow other devices to connect to the server. Edit assets/client.js accordingly.
3. Run `npm install` to install all dependencies.
3. Run `npm run start`.
4. Open the url you defined in client.js (henceforth called [URL]) on any device connected to the server. This is your director's console. You get to control things from here and keep tabs on what's going on. Sorry the colour scheme is such an eyesore.
5. Set up a stage that simulates some sort of a coffee shop. Two chairs and a table, or a couch and a table, or whatever. Stage the show in an actual coffee shop for maximum ambiance. Put two extra chairs behind the stage area and set up a little place slightly offstage to park yourself with your director's console.
6. (optional) Open [URL]/projector and display it on a projector screen that the audience can see.
7. (optional) Gather a rag-tag bunch of musicians. Open [URL]/band on a tablet-sized device, put it on a music stand, and tell the musicians to musically approximate the cues displayed on the screen.
8. Recruit two audience volunteers to be "puppets". Give one of them a mobile device pointed to [URL]/artemis-puppet and the other a mobile device pointed to [URL]/zeff-puppet. Tell them to recite the lines that will appear on their devices, or follow instructions in parentheses. Instruct Artemis puppet to sit at one of the chairs or on the couch, and Zeff puppet to stand off-stage.
9. Recruit two audience volunteers to be "drivers". Give one of them a mobile device pointed to [URL]/artemis-driver and the other a mobile device pointed to [URL]/zeff-driver. Tell them to either select an option from the menus of choices that will appear on their devices, or alternatively, wait if none of the choices seem appealing. Direct Artemis driver to sit in the chair behind Artemis puppet, and Zeff driver to sit in the other chair.
10. Now, let's start the show! On your director's console, click Next Line. Narration will come up on the screen. Read this aloud. Click Next Line when finished. Wait for the actors to follow their instructions, then click Next Line again. You get the idea.
11. If there's a lull in conversation, click the Trigger Background Event button.
12. If you feel like the conversation should come to an end soon, click one of the Wrap Up buttons.
13. When you're finished a conversation, click Reset Game. Repeat steps 8-12 as many times as you want. Between playthroughs, try increasing the Weirdness Level and see what sorts of new options come up.
