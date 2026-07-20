<script lang="ts">
	let { current = 4 }: { current?: number } = $props();
</script>

<div class="chart" aria-label={`Ranking history, currently number ${current}`}>
	<div class="grid"></div>
	<svg viewBox="0 0 600 190" role="img" aria-label="Ranking improved over the last year">
		<path d="M10 165 C90 150, 110 125, 180 120 S270 75, 330 92 S420 42, 590 30" fill="none" stroke="#c8ff35" stroke-width="4" />
		<path d="M10 165 C90 150, 110 125, 180 120 S270 75, 330 92 S420 42, 590 30 L590 190 L10 190Z" fill="rgba(200,255,53,.12)" />
	</svg>
	<div class="rank">#{current}</div>
	<div class="months"><span>Jun ’24</span><span>Sep ’24</span><span>Jan ’25</span><span>May ’25</span></div>
</div>

<style>
	.chart { position: relative; min-height: 230px; overflow: hidden; border: 1px solid #354047; border-radius: 8px; background: #101516; }
	.grid { position: absolute; inset: 0; opacity: .22; background-image: linear-gradient(#59646a 1px, transparent 1px), linear-gradient(90deg, #59646a 1px, transparent 1px); background-size: 42px 42px; }
	svg { position: absolute; right: 18px; bottom: 30px; left: 18px; width: calc(100% - 36px); height: 180px; }
	.rank { position: absolute; top: 18px; right: 18px; padding: 8px 10px; color: var(--color-lime); border: 1px solid #52603a; background: #192018; font-family: 'Archivo Black'; font-size: 1.2rem; }
	.months { position: absolute; right: 18px; bottom: 8px; left: 18px; display: flex; justify-content: space-between; color: #7e898e; font-size: .58rem; text-transform: uppercase; }
</style>
