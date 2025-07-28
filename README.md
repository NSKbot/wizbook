# wizbook
1. Codex has to take these requirements and build the web application independently. It can do as much planning, web-enabled research, iteration, and troubleshooting as it likes or even ask the user some initial clarifying questions as part of a planning phase, but there should be enough data here in the prompt to get to a working deliverable by an agent with iteration and self-validation capabilities.

2. Codex needs to deliver a self contained web application. No extra weird deployment or build steps should be required (because it should be easy to open it up and start using it), no database (yet) and all of the project code should be clearly visible on Github.

3. The application is called wizbook. The purpose of wizbook is eventually to create a fully customizable character sheet for any theoretical TTRPG. To start, we'll be using the Dungeons and Dragons (D&D) Fifth Edition (5E) ruleset from 2014 to prototype wizbook.

4. An instance of wizbook is made up of features. Features are simply collections of user generated static content (UGC) and variables that have a mathematical relationship to some other variables (or static information) in a different feature. 

5. For example, a feature might be weapons. The number of weapons and what types they are will be UGC. You are not expected to have an exhaustive list of all weapons, spells, items, class features, etc from the D&D PHB, DMG, or SRD. The user will bring that content.

6. Instead, wizbook is expected to handle the mathematical relations between the variables of the UGC. For example, the weapons will be UGC but the weapon attack bonuses should be calculated automatically. However, you do NOT need to maintain the ruleset either. That will be UGC as well. So the user should be able to directly input (using dropdowns or a formal equation / expression langauge) how a weapon bonus is calculated.

7. To start, the UI/UX should be absurdly simple. Linear boxes of features, left to right, top to down. The user should be able to "drag and drop" each box to order them.
