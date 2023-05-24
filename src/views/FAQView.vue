<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FAQ',
});
</script>

<template>
  <section class="faq-container" aria-level="Frequently Asked Questions">
    <header class="faq-header">
      <h2 class="faq-header-title">Frequently Asked Questions</h2>
    </header>
    <div class="faq-body">
      <details aria-expanded="false" class="faq-panel">
        <summary class="faq-label">How do I create labels?</summary>
        <div class="faq-panel-body">
          <p class="faq-panel-answer">
            To start creating labels, begin by clicking on the <strong><i>Labels</i></strong> tab on
            the left-hand navigation bar (Barcode icon). After navigating to the
            <strong><i>Labels</i></strong> tab, click the dropdown at the top of the page to reveal
            the label choices. Select the label type you would like to make and begin filling in the
            table with the required information. After you are finished, click the
            <strong><i>Upload Labels</i></strong> button to upload your labels to the server.
          </p>
        </div>
      </details>
      <details aria-expanded="false" class="faq-panel">
        <summary class="faq-label">How do I print labels?</summary>
        <div class="faq-panel-body">
          <p class="faq-panel-answer">
            To print the labels you have uploaded to the server, begin by finding the correct
            printer for the labels you need to print. Not all printing stations can print all types
            of labels. Once you have found the correct printing station, open the file that
            corresponds to the label type you are attempting to print. These files names can be
            found in the label printing tab. Once a label is selected click the information icon to
            the right of the dropdown to see a list of files associated with the given label type.
            After you have opened the correct file for the labels you are printing, simple click
            print or press CTRL + P to open the print dialog. No settings should need to be changed
            here. Click the print button at the bottom of the page. After clicking the button you
            will be presented with a pop up asking for your Pomeroy username. Enter your username
            and your labels should begin printing.
          </p>
        </div>
      </details>
      <details aria-expanded="false" class="faq-panel">
        <summary class="faq-label">
          Is there a way to quickly modify data in the label data?
        </summary>
        <div class="faq-panel-body">
          <p class="faq-panel-answer">
            Of course there is! Who do you think programmed this website? Someone who likes to do
            stuff the slow way? You can highlight any amount of cells in the table and right click
            to bring up a context menu. There are many options in the context menu to format and
            manipulate the selected data. The first few options are related to inserting / deleting
            rows and aligning the text in the cells. Under the
            <strong><i>Quick Editor</i></strong> menu, you will find an assortment of options to
            edit the selected data. The list of options is always growing, so make sure to check
            frequently for new options.
          </p>
        </div>
      </details>
      <details aria-expanded="false" class="faq-panel">
        <summary class="faq-label">Can a new option be added to the Quick Editor menu?</summary>
        <div class="faq-panel-body">
          <p class="faq-panel-answer">
            Certainly! If you would like a new options added, simply send me an email / teams
            message (
            <a href="mailto: james.conn@pomeroy.com?Subject=New Quick Editor Feature Request."
              >james.conn@pomeroy.com</a
            >
            ) or come chat with me. Nothing is impossible so if you have an idea that could benefit
            the team I would love to hear it!
          </p>
        </div>
      </details>
      <details aria-expanded="false" class="faq-panel">
        <summary class="faq-label">Is there an option to highlight duplicates?</summary>
        <div class="faq-panel-body">
          <p class="faq-panel-answer">
            To highlight duplicates simply select a cell in the column you would like to highlight
            duplicates in. Right click on the cell to show the context menu and click
            <strong><i>Highlight Duplicates</i></strong
            >. This will highlight all duplicates in the selected column. To avoid extra overhead
            since our Surface Pro's aren't very capable, you can only highlight duplicates in one
            column at a time. Selecting this option in another column while another is currently
            active will remove the highlighting from the previous column.
          </p>
        </div>
      </details>
      <details aria-expanded="false" class="faq-panel">
        <summary class="faq-label">How do I check the ports on a specific bench?</summary>
        <div class="faq-panel-body">
          <p class="faq-panel-answer">
            To check the ports on a bench, begin by selecting the
            <strong><i>Vlan Changer</i></strong> tab (The odd looking icon underneath the barcode
            icon). After you have navigated to the <strong><i>Vlan Changer</i></strong> tab, click
            the "Bench" dropdown to reveal the bench options. Select the bench you would like to
            check and click the "Check Vlans" button at the bottom of the page. Due to the way our
            switch is set up this can take up to 30 seconds, so please be patient.
          </p>
        </div>
      </details>
      <details aria-expanded="false" class="faq-panel">
        <summary class="faq-label">How do I read the port values?</summary>
        <div class="faq-panel-body">
          <p class="faq-panel-answer">
            After running the "Check Vlans" function, you will be presented with a table of chips
            representing each port in the benches range. Each of these chips can have 1 of 3 colors.
          </p>
          <ul>
            <li>
              <mark class="green-text">Green:</mark> This indicates that the port is connected to a
              devices and has no errors.
            </li>
            <li>Grey: This indicates that the port is not connected and has no errors.</li>
            <li><mark class="red-text">Red:</mark> This indicates that the port has an error.</li>
          </ul>
          <p class="faq-panel-answer">
            You can also hover over each chip for more information about the specific port.
          </p>
        </div>
      </details>
      <details aria-expanded="false" class="faq-panel">
        <summary class="faq-label">How do I change the vlans on a bench?</summary>
        <div class="faq-panel-body">
          <p class="faq-panel-answer">
            To change the vlans on a bench, begin by selecting the
            <strong><i>Vlan Changer</i></strong> tab (The odd looking icon underneath the barcode
            icon). After you have navigated to the <strong><i>Vlan Changer</i></strong> tab, click
            each drop down and make the correct selection corresponding to the bench, vlan and ports
            you want to change. After you have made all of your selections, click the "Change Vlans"
            button at the bottom of the page to send the change request. The change request has
            three responses.
          </p>
          <ul>
            <li>
              Successful: This mean all ports in the range you selected have been changed and no
              errors occured. You should see a message indicating all ports were changed to the
              selected vlan.
            </li>
            <li>
              Partially Successful: This mean most of the ports in the range you selected were
              changed to the selected vlan. This will happen when a port in the range you selected
              is marked as protected. These ports are vital to operations and don't need to be
              changed under normal circumstances. If you do need to change these ports, see a member
              of you leadership / management team for assitance. You should see a message indicating
              that some ports were not changed, but any unprotected ports have been changed..
            </li>
            <li>
              Error: This indicates there was an issue in processing the request. This can be for a
              number of reasons. You will know there is an error if you recieve a message other than
              the two above. The message should include some information as to why the request
              wasn't processed. These errors are also logged, if the issue isn't network related, on
              the backend server. If you see this type of message, check that you are connected to
              the Pomeroy corporate network and try again. If it still fails, reach out to me (
              <a href="mailto: james.conn@pomeroy.com?Subject=Vlan Changer Issues."
                >james.conn@pomeroy.com</a
              >
              ) or a member of the management team for assistance.
            </li>
          </ul>
        </div>
      </details>
      <details aria-expanded="false" class="faq-panel">
        <summary class="faq-label">Can a new theme be added?</summary>
        <div class="faq-panel-body">
          <p class="faq-panel-answer">
            Yes! I can absolutly add a new theme as long as a color palette is provided or an
            example is given. If a color palette is provided, it should contain at least three
            colors. If you would like a new theme added, feel free to reach out to me at
            <a href="mailto: james.conn@pomeroy.com?Subject=New Theme Request"
              >james.conn@pomeroy.com</a
            >.
          </p>
        </div>
      </details>
      <details aria-expanded="false" class="faq-panel">
        <summary class="faq-label">Can a new utility / function be added?</summary>
        <div class="faq-panel-body">
          <p class="faq-panel-answer">
            Yes! There are lots of things that could be added to this website. I can only come up
            with so many ideas, so if you have an idea that you believe would benefit the team I
            would love to hear it! If you would like a new utility / function added, feel free to
            reach out to me at
            <a href="mailto: james.conn@pomeroy.com?Subject=New Theme Request"
              >james.conn@pomeroy.com</a
            >
            or come talk to me ( James Conn ) in person.
          </p>
        </div>
      </details>
    </div>
  </section>
</template>

<style scoped>
.faq-container {
  max-width: 90%;
  margin-inline: auto;
  padding: 50px;
  height: 100%;
  overflow: auto;
}
.faq-header-title {
  font-size: 24px;
  margin-bottom: 30px;
}
.faq-panel {
  padding: 7px 21px;
  margin-bottom: 24px;
  border: 1px solid #777e91;
  border-radius: 7px;
}
.faq-label {
  padding-block: 7px;
  color: var(--color-text-1);
  cursor: pointer;
}
.faq-panel-answer,
.faq-panel-answer * {
  color: var(--color-text-2);
  padding-top: 5px;
  padding-bottom: 7px;
}

.green-text {
  color: rgb(8, 212, 8);
  background: none;
}

.red-text {
  color: rgb(255, 47, 47);
  background: none;
}

/* unvisited link */
a:link {
  color: rgb(0, 179, 255);
}

/* mouse over link */
a:hover {
  color: rgb(105, 138, 255);
}
</style>
