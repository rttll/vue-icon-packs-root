import ProgressBar from 'progress';

function Progress(total) {
  let currentStep = 0;

  const bar = new ProgressBar(':label [:bar] :current/:total', {
    complete: '=',
    incomplete: '-',
    width: 30,
    total,
  });

  function update(label) {
    currentStep += 1;
    bar.tick({
      label: `${label} `.padEnd(20),
    });
  }

  return { update };
}

export { Progress };
